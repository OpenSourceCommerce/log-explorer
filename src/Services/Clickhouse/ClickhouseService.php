<?php


namespace App\Services\Clickhouse;


use Doctrine\DBAL\Schema\Column;
use Doctrine\DBAL\Types\Type;

class ClickhouseService implements ClickhouseServiceInterface
{
    /**
     * @inheritDoc
     */
    public function getTypes(): array
    {
        return [
            'String',
            'DateTime',
            'UInt8',
            'UInt16',
            'UInt32',
            'UInt64',
            'UInt256',
            'Int8',
            'Int16',
            'Int32',
            'Int64',
            'Int128',
            'Int256',
            'Float32',
            'Float64',
            'Decimal',
            'Boolean',
            'UUID',
            'Date',
            'DateTime64',
            'Array(Int8)',
            'Array(Int16)',
            'Array(Int32)',
            'Array(Int64)',
            'Array(UInt8)',
            'Array(UInt16)',
            'Array(UInt32)',
            'Array(UInt64)',
            'Array(Float32)',
            'Array(Float64)',
            'Array(String)',
            'Array(DateTime)',
            'Array(Date)',
        ];
    }
}
