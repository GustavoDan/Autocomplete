<?php
function array_change_key_case_recursive($arr, $case)
{
    return array_map(function ($item) use ($case) {
        if (is_array($item)) {
            $item = array_change_key_case_recursive($item, $case);
        }

        return $item;
    }, array_change_key_case($arr, $case));
}
