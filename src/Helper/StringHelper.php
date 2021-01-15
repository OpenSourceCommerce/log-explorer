<?php


namespace App\Helper;


class StringHelper
{
    /**
     * make random string
     * @param int $length
     * @param string $characters
     * @return string
     * @throws \Exception
     */
    public static function random(int $length = 8, string $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'): string
    {
        $str = '';
        $max = mb_strlen($characters, '8bit') - 1;
        if ($max < 1) {
            throw new \Exception('characters must be at least two characters long');
        }
        for ($i = 0; $i < $length; ++$i) {
            $str .= $characters[random_int(0, $max)];
        }

        return $str;
    }
}
