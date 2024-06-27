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
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { XMarkIcon } from "@/components";
import { CheckedMarckIcon } from "@/components/icons/checkedMarckIcon";
import ModalAcceptEvent from "./modalAcceptEvent";
import { Event } from "@prisma/client";
import { EyeIcon } from "@/components/icons/EyeIcon";
import ModalDetailEvent from "./ModalDetailEvent";
import { EditIcon } from "@/components/icons/EditIcon";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Attente: "warning",
  Validé: "success",
  Annulé: "danger",
};

export default function App({ events }: { events: Event[] }) {
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalValidation, setOpenModalValidation] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [eventModal, setEventModal] = useState<Event | undefined>(undefined);
  const [TypeModal, setTypeModal] = useState<"accept" | "refuse" | "cancel">(
    "accept"
  );

  const openModal = (
    event: Event,
    type: "accept" | "refuse" | "cancel" | "detail" | "update"
  ) => {
    setEventModal(event);
    if (type === "detail") setOpenModalDetail(true);
    else {
      if (type === "update") setOpenModalUpdate(true);
      else setTypeModal(type);
      setOpenModalValidation(true);
    }
  };

  const onClose = () => {
    if (openModalUpdate) {
      setOpenModalUpdate(false);
    }
    if (openModalDetail) {
      setOpenModalDetail(false);
    }
    if (openModalValidation) {
      setOpenModalValidation(false);
      window.location.reload();
    }
  };

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
    let filteredEvents = [...events];

    if (hasSearchFilter) {
      filteredEvents = filteredEvents.filter((event) =>
        event.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredEvents;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, filterValue, statusFilter]);

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

  const renderCell: any = React.useCallback(
    (event: Event, columnKey: React.Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "event":
          return (
            <>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-default-900">{event.name}</span>
                  <span className="text-default-400 text-small">
                    {event.description}
                  </span>
                </div>
              </div>
            </>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={
                statusColorMap[
                  event.validatedAt
                    ? event.cancelledAt
                      ? "Annulé"
                      : "Validé"
                    : "Attente"
                ]
              }
              size="sm"
              variant="flat"
            >
              {event.validatedAt
                ? event.cancelledAt
                  ? "Annulé"
                  : "Validé"
                : "En attente"}
            </Chip>
          );
        case "actions":
          return (
            <div className="inline-flex gap-2">
              <Tooltip color="primary" content="Détail">
                <span
                  className="text-lg cursor-pointer active:opacity-50"
                  onClick={() => openModal(event, "detail")}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              {event.validatedAt ? (
                event.cancelledAt ? (
                  <></>
                ) : (
                  <>
                    <Tooltip color="default" content="Modifier">
                      <span
                        className="text-lg cursor-pointer active:opacity-50"
                        onClick={() =>
                          (window.location.href = "/admin/events/" + event.id)
                        }
                      >
                        <EditIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Annuler">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => openModal(event, "cancel")}
                      >
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </>
                )
              ) : (
                <>
                  <Tooltip color="success" content="Valider">
                    <span
                      className="text-lg text-success cursor-pointer active:opacity-50"
                      onClick={() => openModal(event, "accept")}
                    >
                      <CheckedMarckIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Refuser">
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={() => openModal(event, "refuse")}
                    >
                      <XMarkIcon />
                    </span>
                  </Tooltip>
                </>
              )}
            </div>
          );
        case "date":
          return (
            new Date(event.startingDate).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            }) +
            " au " +
            new Date(event.endingDate).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })
          );
        default:
          return cellValue;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [statusFilter, hasSearchFilter, filterValue, events]
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
            placeholder="Recherche de l'évenement..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total de {events.length} évenements
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
    events.length,
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
            <TableColumn key="event" allowsSorting={true}>
              EVENEMENT
            </TableColumn>
            <TableColumn key="date" allowsSorting={true}>
              DATE
            </TableColumn>
            <TableColumn key="status" allowsSorting={true}>
              STATUS
            </TableColumn>
            <TableColumn key="actions" align="center">
              ACTIONS
            </TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={"il y a pas d'evenement"}
            items={sortedItems}
          >
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

      <ModalAcceptEvent
        eventModal={eventModal}
        isOpen={openModalValidation}
        onClose={onClose}
        type={TypeModal}
      />
      <ModalDetailEvent
        eventModal={eventModal}
        isOpen={openModalDetail}
        onClose={onClose}
      />
    </>
  );
}
