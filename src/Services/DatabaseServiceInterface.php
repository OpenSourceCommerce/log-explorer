<?php


namespace App\Services;


/**
 * Interface DatabaseServiceInterface
 * @package App\Services
 */
interface DatabaseServiceInterface
{
    public function count();
    public function countAll();
    public function first();
    public function all();
}
