from gtts import gTTS
import os #ffmpeg, os, subprocess

phrases = [
						"Hola Marcos estás bien?",
						"Todo bien, estoy bien gracias. ¿Y tú?",
						"Buenos dias ¿cómo está su familia?",
						"Sí, muy bien gracias. Y usted ¿cómo está?",
						"Buenas noches señores, ¿cómo están?",
						"Gracias Carmela. Y usted, ¿cómo está?"
]

# Generate MP3s
for phrase in phrases:
    tts = gTTS(text=phrase, lang="es", tld="es")  # female Spanish voice
    
    # Remove question marks from filenames
    filename = phrase.replace("?", "") + ".mp3"
    filename = filename.replace("..mp3", ".mp3")

    print(f"Saving {filename} …")
    tts.save(filename)
    # ffmpeg_command = ["ffmpeg", "-y", "-i", filename, "-filter:a", "atempo=1.3", filename]
    # subprocess.run(ffmpeg_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

print("✅ All MP3s generated.")
