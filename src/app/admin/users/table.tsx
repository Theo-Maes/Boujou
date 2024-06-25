"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { EditIcon } from "@/components/icons/EditIcon";
import { EyeIcon } from "@/components/icons/EyeIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";

const statusColorMap: Record<string, ChipProps["color"]> = {
  test: "success",
  Utilisateur: "success",
  Admin: "danger",
};

export default function App({ users }: { users: any[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userModal, setUserModal] = useState<any>();

  const openModal = (user: any) => {
    setUserModal(user);
    onOpen();
  };

  async function removeUser(user: any) {
    const response = await fetch(
      `http://localhost:3000/api/user/${user.id}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      alert("Failed to delete user");
    }
    users = users.filter((u) => u.id !== user.id);
  }

  const [filterValue, setFilterValue] = React.useState("");

  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "date_creation",
    direction: "descending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.fullname.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a] as number;
      const second = b[sortDescriptor.column as keyof typeof b] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user: any, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof any];

      switch (columnKey) {
        case "identifiant":
          return (
            <>
              <div className="flex flex-row gap-2">
                <Image
                  src={user.avatar}
                  alt="avatar"
                  width={45}
                  height={45}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-default-900">{user.fullname}</span>
                  <span className="text-default-400 text-small">
                    {user.email}
                  </span>
                </div>
              </div>
            </>
          );
        case "role":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.role.name]}
              size="sm"
              variant="flat"
            >
              {user.role.name}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => console.log("details")}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => console.log("edit", { user })}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => openModal(user)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [statusFilter, hasSearchFilter, filterValue, users]
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%] bg-gray-100 dark:bg-gray-800"
            placeholder="Recherche de l'utilisateur..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total de {users.length} utilisateurs
          </span>
          <label className="flex items-center text-default-400 text-small">
            Nombre de lignes par page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterValue,
    statusFilter,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400"></span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Précédent
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Suivant
          </Button>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <div className="container mx-auto">
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isStriped
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[475px]",
          }}
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSortChange={setSortDescriptor}
        >
          <TableHeader>
            <TableColumn key="identifiant" allowsSorting={true}>
              USER
            </TableColumn>
            <TableColumn key="createdAt" allowsSorting={true}>
              CREATED AT
            </TableColumn>
            <TableColumn key="fullname" allowsSorting={true}>
              FULLNAME
            </TableColumn>
            <TableColumn key="role" allowsSorting={true}>
              ROLE
            </TableColumn>
            <TableColumn key="actions" align="center">
              ACTIONS
            </TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No users found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Modal
        isOpen={isOpen}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton={true}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1">
                Êtes-vous sûr de vouloir supprimer {userModal.fullname} ?
              </ModalHeader>
              <ModalBody>Compte crée le {userModal.createdAt}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Non
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    removeUser(userModal);
                    onClose();
                  }}
                >
                  Oui
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
