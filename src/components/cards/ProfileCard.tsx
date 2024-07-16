import Image from "next/image";
import { Button, Card, CardBody, CardFooter, CardHeader, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Custom403 from "@/app/forbidden";
import Link from "next/link";
import { UserData } from "../profile/ProfilePage";
import { useTheme } from "next-themes";
import { HiMiniTrash } from "react-icons/hi2";

interface ProfileCardProps {
  user: UserData;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  if (!(session && session.user.id === user.id)) {
    return <Custom403 />;
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/user/${user.id}/delete`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const result = await response.json();
        signOut({ callbackUrl: '/' });
      } else {
        console.error('Failed to delete user');
        alert('Échec de la suppression de l\'utilisateur');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Erreur lors de la suppression de l\'utilisateur');
    }
  };

  return (
    <Card className="p-1 w-full md:max-w-[300px] h-[300px] rounded-none shadow-xl dark:bg-gray-800">
      <CardHeader className="flex justify-end">
        <Tooltip content="Supprimer l'utilisateur">
            <Button color="danger" variant="light" size="sm" onPress={onOpen}>
                <HiMiniTrash className="text-xl text-red-500" />
            </Button>
        </Tooltip>
      </CardHeader>  
      <CardBody className="pb-0 pt-2 flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="relative rounded-full overflow-hidden w-20 h-20">
            <Image
              src={`/api/avatar/${user?.avatar?.substring(8)}`}
              alt="User Avatar"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-lg">{user.fullname}</p>
        </div>
        <div className="text-center mt-4">
          <p className="text-lg">{user.email}</p>
        </div>
      </CardBody>
      <CardFooter className="flex justify-center">
          <Link href={`/profile/${user.id}/update`}>
            <Button 
                color={theme === "dark" ? "secondary" : "primary"}
                size="sm"
                className="mx-2 text-white dark:text-black"
            >
              Modifier mes infos
            </Button>
          </Link>
      </CardFooter>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Suppression de l&apos;utilisateur</ModalHeader>
              <ModalBody>
                <p> 
                  Voulez-vous vraiment supprimer l&apos;utilisateur
                </p>
                <p className="font-bold">
                  {user.email}
                </p>
                
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Annuler
                </Button>
                <Button color="danger" onPress={() => { handleDelete(); onClose(); }}>
                  Supprimer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default ProfileCard;
