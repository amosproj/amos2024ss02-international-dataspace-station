export async function uploadFile(form: FormData) {
  try {
    const response = await fetch(`/api/uploadFile`, {
        method: 'POST',
        body: form,
    });
    
    if (!response.ok) {
        throw new Error("HTTP Error! Status: ${response.status}");
    }
    const data = await response.json();
    return data.id;
  } catch (err) {
    console.error("Error uploading file: ", err);
    throw new Error("Failed to upload file");
  }
}