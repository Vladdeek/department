import requests
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackContext
import os
from dotenv import load_dotenv

# Загружаем переменные из .env
load_dotenv()

TOKEN = os.getenv("TELEGRAM_API_TOKEN")

# Функция для обработки команды /start
async def start(update: Update, context: CallbackContext):
    user_id = update.effective_user.id  # Получаем user_id
    first_name = update.effective_user.first_name  # Имя пользователя
    mini_app_url = f"https://mini-app-c81b5.web.app/?user_id={user_id}"
    test_url = f"http://192.168.167.48:5173/?user_id={user_id}"  # Передаем user_id в URL

    # Создаем кнопку для mini app
    keyboard = [[InlineKeyboardButton("Открыть mini app", web_app={"url": mini_app_url})]]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text(f"Привет, {first_name}! \nНажми на кнопку, чтобы открыть mini app:", reply_markup=reply_markup)

# Основная функция для запуска бота
def main():
    application = Application.builder().token(TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    application.run_polling()

if __name__ == '__main__':
    main()
