from gtts import gTTS
import os

phrases = [
    "La Unión Europea tiene cuatrocientos cuarenta y ocho millones de habitantes.",
    "Los científicos dicen que el clima del planeta Marte, hace unos tres mil millones de años, era muy similar al de la Tierra.",
    "Una señora de Medellín se ha ganado ciento ocho millones de pesos en la lotería de Navidad.",
    "Se necesitan trece millones doscientos noventa euros para restaurar 8 monumentos importantes en Cancún.",
    "En 2013, la población de la Tierra superó los siete mil millones de personas."
]

# Generate MP3s
for phrase in phrases:
    tts = gTTS(text=phrase, lang="es", slow=True, tld="es")  # female Spanish voice
    
    # Remove question marks from filenames
    filename = phrase.replace("?", "") + ".mp3"
    filename = filename.replace("..mp3", "") + ".mp3"
    
    print(f"Saving {filename} …")
    tts.save(filename)

print("✅ All MP3s generated.")
