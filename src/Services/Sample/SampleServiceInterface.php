<?php


namespace App\Services\Sample;


interface SampleServiceInterface
{
    /**
     * @param \DateTime $at
     * @param int $number
     */
    public function createDataAt(\DateTime $at, int $number);
}
