<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDiseaseDetectionRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'image' => 'required|image|mimes:jpeg,png,jpg|max:10240',
            'plot_id' => 'nullable|exists:plots,id',
        ];
    }

    public function messages(): array
    {
        return [
            'image.required' => 'Une image est requise.',
            'image.image' => 'Le fichier doit être une image.',
            'image.max' => 'L\'image ne doit pas dépasser 10 Mo.',
        ];
    }
}
