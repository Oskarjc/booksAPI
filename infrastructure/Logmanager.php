<?php

namespace Infrastructure;

use Monolog\Handler\RotatingFileHandler;
use Monolog\Handler\SlackWebhookHandler;
use Monolog\Logger;

class LogManager {

    private static $logger;

    public static function createInstance()
    {
        if (!self::$logger)
        {
            $logger = new Logger(getenv('LOGGER_NAME'));
            if (getenv('LOGGER_FILE') && getenv('LOGGER_FILE') === 'true')
            {
                $rotatingFileHandler = new RotatingFileHandler(getenv('LOGGER_FILE_PATH'),getenv('LOGGER_FILE_KEEP_DAYS'),Logger::toMonologLevel(getenv('LOGGER_FILE_LOGLEVEL')));
                $logger->pushHandler($rotatingFileHandler);

            }
            if (getenv('LOGGER_SLACK') && getenv('LOGGER_SLACK') === 'true')
            {
                $slackWebhookHandler = new SlackWebhookHandler(getenv('LOGGER_SLACK_WEBHOOKURL'),getenv('LOGGER_SLACK_CHANNEL'),getenv('LOGGER_SLACK_USERNAME'),null,null,null,null,Logger::toMonologLevel(getenv('LOGGER_SLACK_LOGLEVEL')));
                $logger->pushHandler($slackWebhookHandler);
            }

            self::$logger = $logger;
        }

        return self::$logger;
    }

    public static function log($level,$message)
    {
        self::createInstance()->log($level,$message);
    }
}