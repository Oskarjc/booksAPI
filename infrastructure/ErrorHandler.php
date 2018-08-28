<?php

namespace Infrastructure;

use ErrorException;
use Throwable;

class ErrorHandler {

    public static function handleExceptions(Throwable $oException) : void
    {
        LogManager::log('alert','Unhandled exception: ' . $oException->getMessage() . ' - ' . $oException->getTraceAsString());
    }

    public static function handleErrors($iErrorNumber, $sError, $sErrorFile, $iErrorLine) : void
    {
        throw new ErrorException($sError, $iErrorNumber, 0, $sErrorFile, $iErrorLine);
    }
}