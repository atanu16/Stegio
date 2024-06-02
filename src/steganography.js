const texts = [
  "Encrypting", "Decrypting", "Hiding text" , "Inside a image"
];
const delay = 1000; 
const typingSpeed = 100;
let index = 0;

function typeText() {
  if (index >= texts.length) {
    index = 0; 
  }
  
  const currentText = texts[index];
  let textIndex = 0;
  
  const typingInterval = setInterval(() => {
    document.getElementById('typing-text').textContent = currentText.slice(0, textIndex);
    textIndex++;
    
    if (textIndex > currentText.length) {
      clearInterval(typingInterval);
      index++;
      setTimeout(typeText, delay);
    }
  }, typingSpeed);
}


typeText();



var preloader = document.getElementById("Loading");
function myfung() {
  preloader.style.display = "none";
}



document.getElementById("currentYear").innerText = new Date().getFullYear();


function updateDateTime() {
  const now = new Date();

 
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = now.getFullYear();

  const date = `${day}/${month}/${year}`;


  const time = now.toLocaleTimeString();


  const currentDateTime = `${date} ${time}`;
  document.getElementById("currentDateTime").textContent = currentDateTime;
}


updateDateTime();


setInterval(updateDateTime, 1000);

function showEncryptForm() {
  document.getElementById("encrypt-form").style.display = "block";
  document.getElementById("decrypt-form").style.display = "none";
  document.getElementById("output-message").innerHTML = "";
  document.getElementById("encrypt-btn").classList.add("active");
  document.getElementById("decrypt-btn").classList.remove("active");
}

function showDecryptForm() {
  document.getElementById("decrypt-form").style.display = "block";
  document.getElementById("encrypt-form").style.display = "none";
  document.getElementById("output-message").innerHTML = "";
  document.getElementById("decrypt-btn").classList.add("active");
  document.getElementById("encrypt-btn").classList.remove("active");
}
function hideText() {
  const coverImageFile = document.getElementById("cover-image").files[0];
  const hiddenText = document.getElementById("hidden-text").value;
  const secretKey = document.getElementById("secret-key").value;

  if (!coverImageFile || !hiddenText || !secretKey) {
    alert("Please provide a cover image, text to hide, and a secret key.");
    return;
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let binaryText = textToBinary(hiddenText);
      binaryText = xorEncryptDecrypt(binaryText, secretKey);
      binaryText += "00000000";

      if (binaryText.length > data.length * 4) {
        alert("Text is too long to hide in this image.");
        return;
      }

      for (let i = 0; i < binaryText.length; i++) {
        const pixelIndex = i * 4;
        data[pixelIndex] = (data[pixelIndex] & 0xfe) | parseInt(binaryText[i]);
      }

      ctx.putImageData(imageData, 0, 0);

      const encryptedImg = canvas.toDataURL("image/png");
      downloadImage(encryptedImg, "encrypted_img.png");

      document.getElementById("output-message").innerHTML =
        "Text successfully hidden in the image.";
    };
    img.src = event.target.result;
  };

  reader.readAsDataURL(coverImageFile);
}

function revealText() {
  const hiddenImageFile = document.getElementById("hidden-image").files[0];
  const revealKey = document.getElementById("reveal-key").value;

  if (!hiddenImageFile || !revealKey) {
    alert("Please provide an image with hidden text and the secret key.");
    return;
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let binaryText = "";

      for (let i = 0; i < data.length; i += 4) {
        binaryText += data[i] & 1;
        if (binaryText.length % 8 === 0 && binaryText.endsWith("00000000")) {
          break;
        }
      }

      binaryText = binaryText.slice(0, -8);
      const decryptedBinaryText = xorEncryptDecrypt(binaryText, revealKey);
      const revealedText = binaryToText(decryptedBinaryText);

      // document.getElementById(
      //   "output-message"
      // ).innerHTML = `Encrypted text: ${revealedText}`;

      alert(`Encrypted text: ${revealedText}`);

    };
    img.src = event.target.result;
  };

  reader.readAsDataURL(hiddenImageFile);
}

function textToBinary(text) {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");
}

function binaryToText(binary) {
  return binary
    .match(/.{8}/g)
    .map((byte) => String.fromCharCode(parseInt(byte, 2)))
    .join("");
}

function xorEncryptDecrypt(binaryText, key) {
  const keyBinary = textToBinary(key);
  const keyLength = keyBinary.length;
  return binaryText
    .split("")
    .map((bit, index) => bit ^ keyBinary[index % keyLength])
    .join("");
}

function downloadImage(dataurl, filename) {
  const a = document.createElement("a");
  a.href = dataurl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
