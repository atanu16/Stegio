<p align="center" width="100%">
    <img width="15%" src="https://i.ibb.co/YfGpv3c/image-removebg-preview-8.png">
</p>



# Stegio 

This Website implements an image steganography tool that allows users to hide secret messages within images . The tool consists of functionalities for encoding a message into an image and decoding a hidden message from an image.

- If you want a In depth project of image steganography then visit  [here](https://github.com/atanu16/Image-Steganography)



## Algorithm Used: 

- Least Significant Bit (LSB) Embedding : <br>
LSB embedding is a steganographic technique that hides information within an image by modifying the least significant bits of the image's pixel values. In this code, the binary representation of the text is XOR-encrypted and then embedded into the LSB of the red channel of each pixel. This method minimally alters the image, making the changes imperceptible to the human eye. The embedded text includes a terminator ("00000000") to mark its end. While LSB embedding is simple and effective for small amounts of data, it can be susceptible to detection through steganalysis.

<p align="center" width="100%">
    <img width="50%" src="https://i.ibb.co/6P4L48k/1-Gu-Romz-VTPMEJ1hf-Kan-RBA.png">
</p>



- Text to Binary Conversion : <br>
Text to binary conversion transforms each character of a string into its binary representation. The textToBinary function in the code achieves this by converting each character to its ASCII value and then to an 8-bit binary string. These binary strings are concatenated to form a continuous binary sequence representing the entire text. This binary format is essential for embedding the text within an image, as it allows each bit to be individually manipulated and embedded into the image's pixel data.


<p align="center" width="100%">
    <img width="50%" src="https://i.ibb.co/p6DzLyp/image.png">
</p>



- Binary to Text Conversion : <br>
Binary to text conversion reverses the process of text to binary conversion, converting a binary string back into readable text. The binaryToText function splits the binary string into 8-bit chunks, each representing an ASCII value. These chunks are then converted from binary to decimal (ASCII), and subsequently to their corresponding characters, reconstructing the original text. This conversion is crucial for retrieving and understanding the hidden message once it has been extracted and decrypted from the image.

<p align="center" width="100%">
    <img width="50%" src="https://i.ibb.co/hDWbMLx/image.png">
</p>



- XOR Encryption/Decryption : <br>
XOR encryption is a symmetric encryption technique used in the code to secure the binary text before embedding it in the image. The xorEncryptDecrypt function performs a bitwise XOR operation between the binary text and a binary key. If the key is shorter, it wraps around and repeats. This operation ensures that the text can be decrypted by applying the same XOR operation with the same key. The simplicity of XOR makes it efficient, but it is not highly secure against more advanced cryptographic analysis without additional security measures.


<p align="center" width="100%">
    <img width="50%" src="https://www.oreilly.com/api/v2/epubs/9781788392501/files/assets/9cb52b5d-564e-4ecc-8cc8-d7e4b725d664.png">
</p>

## Run Locally

Clone the project

```bash
  git clone https://github.com/atanu16/Stegio.git
```

Go to the project directory

```bash
  cd Stegio
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Authors

- [@Atanu](https://www.github.com/atanu16)

