<?php


namespace App\Services\GraphLine;


use App\Entity\GraphLine;

interface GraphLineServiceInterface
{
    /**
     * @param $id
     * @return GraphLine
     */
    public function findById($id): GraphLine;
}
