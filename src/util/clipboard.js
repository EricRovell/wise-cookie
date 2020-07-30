export default async function copyToClipboard(text) {
  // Clipboard API
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (error) {
      console.log("Something is wrong...");
    }
  }

  // Dummy input woth execCommand method
  const input = document.createElement("textarea");
  input.value = text;

  // avoid scrolling
  input.style.top = 0;
  input.style.left = 0;
  input.style.position = "fixed";

  document.body.appendChild(input);
  input.focus();
  input.select();

  try {
    document.execCommand("copy");
  } catch (error) {
    console.log(error.message);
  }

  document.body.removeChild(input);  
}


      