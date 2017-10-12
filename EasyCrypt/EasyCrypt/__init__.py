plain_alphabet  = 'abcdefghijklmnopqrstuvwxyz'
cipher_alphabet = 'qwertyuiopasdfghjklzxcvbnm'

def encrypt1(plain_text):
    cipher_text = ''
    for plain_letter in plain_text:
        number = plain_alphabet.find(plain_letter)
        if number == -1:
            cipher_letter = ' '
        else:
            cipher_letter = cipher_alphabet[number]
        cipher_text += cipher_letter
    return cipher_text

def decrypt1(cipher_text):
    plain_string = ''
    for cipher_letter in cipher_text:
        number = cipher_alphabet.find(cipher_letter)
        if number == -1:
            plain_letter = ' '
        else:
            plain_letter = plain_alphabet[number]
        plain_string += plain_letter
    return plain_string
