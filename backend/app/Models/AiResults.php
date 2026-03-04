<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiResults extends Model
{
    protected $fillable = [
        'lecture_id',
        'type',
        'content'
    ];

    public function lecture(){
        return $this->belongsTo(Lecture::class);
    }
}