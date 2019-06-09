<?php

namespace App\Http\Middleware;

class Func
{
    const STATE_CODE = array(
        'JHR' => array('01', '21', '22', '23', '24'),
        'KDH' => array('02', '25', '26', '27'),
        'KLT' => array('03', '28', '29'),
        'MLK' => array('04', '30'),
        'NSL'	=> array('05', '31', '59'),
        'PHG' => array('06', '32', '33'),
        'PPG' => array('07', '34', '35'),
        'PRK' => array('08', '36', '37', '38' , '39'),
        'PRL' => array('09', '40'),
        'SLG' => array('10', '41', '42', '43', '44'),
        'TRG' => array('11', '45', '46'),
        'SBH' => array('12', '47', '48', '49'),
        'SRW' => array('13', '50', '51', '52', '53'),
        'KUL'	=> array('14', '54', '55', '56', '57'),
        'LAB'	=> array('15', '58'),
        'PTR'	=> array('16'),
        'NAV' => array('82')
    );

    public static function generateStaffCode($ic)
    {
        $icCode = substr($ic, 6, 2);
        foreach (self::STATE_CODE as $state => $code) {
            if (in_array($icCode, $code)) {
                return $state;
            }
        }
        return 'NAV';
    }

    public static function addZeroString($num)
    {
        $numStr = "00000" . $num;
        return substr($numStr, -5, 5);
    }

    public static function calcEndDate($start_date, $period)
    {
        $period = is_int($period) ? ($period > 0 ? $period-1 : 0) : 0;
        $date = date_create($start_date);
        date_add($date, date_interval_create_from_date_string($period . " days"));
        return date_format($date, 'Y-m-d H:i:s');
    }
}
