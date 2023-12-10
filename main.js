function toggleKeyInput() {
    const encryptionMethod = document.getElementById('encryptionMethod').value;
    const keyInput = document.getElementById('keyInput');
  
    if (encryptionMethod === 'caesar' || encryptionMethod === 'vigenere') {
      keyInput.style.display = 'block';
    } else {
      keyInput.style.display = 'none';
    }
  }

function process() { 
const processType = document.getElementById('processType').value;
const method = document.getElementById('encryptionMethod').value;
const text = document.getElementById('inputText').value;
let result;
key = document.getElementById('key').value
const constantShift = parseInt(document.getElementById('key').value);

    const cesarEncrypt = (text)=>{
        return text.replace(/[a-zA-Z]/g, (char) => {
            const isUpperCase = char === char.toUpperCase();
            const base = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            const shifted = (char.charCodeAt(0) - base + constantShift) % 26;
            return String.fromCharCode(base + (shifted + 26) % 26);
          });
    }
    const cesarDecrypt = (text)=>{
        return text.replace(/[a-zA-Z]/g, (char) => {
            const isUpperCase = char === char.toUpperCase();
            const base = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            // Adjust the decryption formula to subtract the shift
            const shifted = (char.charCodeAt(0) - base - constantShift + 26) % 26;
            return String.fromCharCode(base + (shifted + 26) % 26);
          });
    }

const atbashEncryptDecrypt = (text)=>{
    return text.replace(/[a-zA-Z]/g, (char) => {
        const isUpperCase = char === char.toUpperCase();
        const base = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
        return String.fromCharCode(base + 25 - (char.charCodeAt(0) - base));
      });
}


    const rot13EncryptDecrypt = (text) => {
        let result = '';
        for (let i = 0; i < text.length; i++) {
          let c = text.charAt(i);
          if (c >= 'a' && c <= 'm') {
            c = String.fromCharCode(c.charCodeAt(0) + 13);
          } else if (c >= 'A' && c <= 'M') {
            c = String.fromCharCode(c.charCodeAt(0) + 13);
          } else if (c >= 'n' && c <= 'z') {
            c = String.fromCharCode(c.charCodeAt(0) - 13);
          } else if (c >= 'N' && c <= 'Z') {
            c = String.fromCharCode(c.charCodeAt(0) - 13);
          }
          result += c;
        }
        return result;
      };




      function vigenereEncrypt(plaintext) {
        plaintext = plaintext.toUpperCase();
        keyword = key.toUpperCase();
        let ciphertext = '';
        for (let i = 0; i < plaintext.length; i++) {
          const char = plaintext.charAt(i);
          if (/[A-Z]/.test(char)) {
            const shift = keyword.charCodeAt(i % keyword.length) - 'A'.charCodeAt(0);
            const encryptedChar = String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % 26) + 'A'.charCodeAt(0));
            ciphertext += encryptedChar;
          } else {
            ciphertext += char;
          }
        }
        return ciphertext;
      }

      function vigenereDecrypt(ciphertext) {
        ciphertext = ciphertext.toUpperCase();
        keyword = key.toUpperCase();      
        let plaintext = '';      
        for (let i = 0; i < ciphertext.length; i++) {
          const char = ciphertext.charAt(i);     
          if (/[A-Z]/.test(char)) {
            const shift = keyword.charCodeAt(i % keyword.length) - 'A'.charCodeAt(0);      
            const decryptedChar = String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) - shift + 26) % 26) + 'A'.charCodeAt(0));
            plaintext += decryptedChar;
          } else {
            plaintext += char;
          }
        }
      
        return plaintext;
      }




   switch (method) {
      case 'caesar':
        if(processType === 'encrypt') {
          result = cesarEncrypt(text)
        }else{
         result = cesarDecrypt(text)
        }
        break;
      case 'rot13':
        result = rot13EncryptDecrypt(text)
        break;
      case 'atbash':
        result = atbashEncryptDecrypt(text)
        break;
      case 'vigenere':
        if(processType === 'encrypt') {
          result = vigenereEncrypt(text)
        }else{
         result = vigenereDecrypt(text)
        }
          break;
      default:
        document.getElementById('result').innerText = 'something wrong happend';
        return;
    }
  
    document.getElementById('result').innerText = 'Result: ' + result;
  }