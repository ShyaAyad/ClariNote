<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LectureText extends Model
{
    protected $fillable = [
        'lecture_id',
        'content',
    ];

    public function lecture(){
        return $this->belongsTo(Lecture::class);
    }
}
