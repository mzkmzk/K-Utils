"use strict";

exports.__esModule = true;
var Time = function Time() {};

/**
 * 获取当天剩余时间(秒)
 */
Time.prototype.get_day_residue_second = function () {
    var cur_date = new Date(),
        cur_tamp = cur_date.getTime(),
        //当前时间戳
    cur_wee_hours = new Date(cur_date.toLocaleDateString()).getTime() - 1,
        // //当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态
    passed_tamp = cur_tamp - cur_wee_hours; //当日已经过去的时间（毫秒）

    //当日剩余时间
    return 24 * 60 * 60 * 1000 - passed_tamp;
};

exports["default"] = Time;