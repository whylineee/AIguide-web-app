// playwright-mcp.config.ts
const config = {
    // Порт, на якому слухає MCP-сервер
    port: 4000,

    // Рівень логів: 'info', 'warn', 'error', 'debug'
    logLevel: 'info',

    // Браузер для запуску тестів: 'chromium', 'firefox', 'webkit'
    browser: 'chromium',

    // Шлях до тестів або скриптів MCP
    testDir: './tests',

    // Опції паралельного запуску агентів
    parallelAgents: 2,

    // Таймаут для тестів/завдань (в мс)
    timeout: 30000,
};

export default config;