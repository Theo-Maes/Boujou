import { Category, Group } from "@prisma/client";

interface GroupData extends Group {
  data : {
    id: number;
    eventId: number;
    userId: number;
  }
}

export type ApiError = {
  message: string;
  status?: number;
};
async function fetchCategories(): Promise<Category[] | ApiError> {
  try {
    const response = await fetch("http://localhost:3000/api/categories");

    // Vérifiez si la réponse est ok (statut 200-299)
    if (!response.ok) {
      throw {
        message: `HTTP error! status: ${response.status}`,
        status: response.status,
      };
    }

    // Convertir la réponse en JSON
    const categories: Category[] = await response.json();
    return categories;
  } catch (error) {
    // Gestion des erreurs
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "An unknown error occurred" };
    }
  }
}

export async function createGroup(userId: number, eventId: number) {
  const url = "/api/group/create";
  const formData = new FormData();

  formData.append("userId", userId.toString());
  formData.append("eventId", eventId.toString());

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GroupData = await response.json();
    console.log("Data returned from API:", data);
    
    return data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
}

export async function createEvent(
  data: any,
  imageUrl?: string
): Promise<number> {
  const url = "/api/event/create/aws";
  const eventData = {
    ...data,
    image: imageUrl,
    latitude: "00000000.4444444",
    longitude: "00000000.4444444",
    categoryId: 34,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.newEvent.id; // Assurez-vous que l'ID est dans la réponse
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create event");
    }
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}

export async function uploadFile(image: File): Promise<string> {
  const filename = image.name;
  const fileType = image.type;
  const presignUrl = `/api/presign?file=${filename}&fileType=${fileType}`;

  try {
    // Obtenir l'URL présignée
    const presignResponse = await fetch(presignUrl);

    if (!presignResponse.ok) {
      throw new Error(
        `Failed to get presigned URL: ${presignResponse.statusText}`
      );
    }

    const { url } = await presignResponse.json();
    const imageUrl = new URL(url);
    // Télécharger le fichier
    const uploadResponse = await fetch(url, {
      method: "PUT",
      body: image,
      headers: { "Content-Type": fileType },
    });

    if (!uploadResponse.ok) {
      throw new Error(`File upload failed: ${uploadResponse.statusText}`);
    }

    return `${imageUrl.origin}${imageUrl.pathname}`;
  } catch (error) {
    throw { message: "Probleme lors de l'upload d'image" };
  }
}
export async function joinGroup(
  userId: number,
  groupId: number
): Promise<Category[] | ApiError> {
  const url = `/api/group/${groupId}/join`;
  const formData = new FormData();

  formData.append("userId", userId.toString());

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      console.log(response);
      throw { message: data.erreur };
    }
    return data;
  } catch (error) {
    throw { message: "Vous étes déja membre ?" };
  }
}

export async function createDriver(data: any, userId: number, groupId: number) {

  const url = `/api/driver/create/`;
  const formData = new FormData();

  formData.append("userId", userId.toString());
  formData.append("groupId", groupId.toString());
  formData.append("quantity", data.quantity.toString());
  formData.append("city", data.city.toString());
  formData.append("adress", data.address.toString());
  formData.append("zipcode", data.zipCode.toString());
  formData.append("startingdate", data.startingDate.toString());
  formData.append("endingdate", data.endingDate.toString());

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error joining group:", error);
    throw { message: "Vous étes déja conducteur ?" };
  }
}

export async function createHost(data: any, userId: number, groupId: number) {

  const url = `/api/host/create/`;
  const formData = new FormData();

  formData.append("userId", userId.toString());
  formData.append("groupId", groupId.toString());
  formData.append("quantity", data.quantity.toString());
  formData.append("city", data.city.toString());
  formData.append("adress", data.address.toString());
  formData.append("zipcode", data.zipCode.toString());
  formData.append("startingdate", data.startingDate.toString());
  formData.append("endingdate", data.endingDate.toString());

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error joining group:", error);
    throw { message: "Vous étes déja hébergeur ?" };
  }
}

export async function createDoubleHost(data: any, userId: number, groupId: number) {

  const url = `/api/host/create/`;
  const formData = new FormData();

  formData.append("userId", userId.toString());
  formData.append("groupId", groupId.toString());
  formData.append("quantity", data.quantityHost.toString());
  formData.append("city", data.cityHost.toString());
  formData.append("adress", data.addressHost.toString());
  formData.append("zipcode", data.zipCodeHost.toString());
  formData.append("startingdate", data.startingDateHost.toString());
  formData.append("endingdate", data.endingDateHost.toString());

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error joining group:", error);
    throw { message: "Vous étes déja hébergeur ?" };
  }
}