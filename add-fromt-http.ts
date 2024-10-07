import axios from 'axios';

class LokiLogger {
    private url: string;
    private job: string;

    constructor(url: string, job: string) {
        this.url = url; // URL Loki
        this.job = job; // Имя работы (job)
    }

    // Метод для логирования сообщения
    public async log(level: string, message: string, additionalParams: Record<string, any> = {}): Promise<void> {
        // Получаем текущую временную метку в наносекундах
        const timestamp = Math.floor(Date.now() * 1e6).toString();

        // Создаем объект данных для отправки
        const data = {
            streams: [
                {
                    stream: {
                        job: this.job,
                        level: level,
                        ...additionalParams, // Передаем дополнительные параметры
                    },
                    values: [
                        [timestamp, message]
                    ]
                }
            ]
        };

        try {
            // Отправляем POST-запрос в Loki
            const response = await axios.post(`${this.url}:3100/loki/api/v1/push`, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('Response:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error message:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }
}

// Пример использования
const logger = new LokiLogger('SERVER_IP', 'admin');

let i = 0;
setInterval(() => {
    //logger.log('info', `Hello, World ${i}!`);
    logger.log('info', JSON.stringify({ min: 1, max: 100 }));
    i++
}, 1000);
