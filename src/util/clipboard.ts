export default async function copyToClipboard(text: string): Promise<boolean> {
  // Clipboard API
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error("Something is wrong:", error.message);
    }
  }

  // Dummy input woth execCommand method
  const input = document.createElement("textarea");
  input.value = text;

  // avoid scrolling
  input.style.top = "0";
  input.style.left = "0";
  input.style.position = "fixed";

  document.body.appendChild(input);
  input.focus();
  input.select();

  try {
    document.execCommand("copy");
  } catch (error) {
    console.error("Something is wrong:", error.message);
    return false;
  } finally {
    document.body.removeChild(input);
  }

  return true;
}


      