<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lecture extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'original_filename',
    ];

    // relationship(s)
    // relationship names should be camelCase not PascalCase
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function lectureText(){
        return $this->hasOne(LectureText::class);
    }

    public function aiResults(){
        return $this->hasMany(AiResults::class);
    }
}
