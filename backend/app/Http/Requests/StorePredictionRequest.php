<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePredictionRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'crop_name' => 'required|string|max:255',
            'area_hectares' => 'required|numeric|min:0.01|max:10000',
            'region' => 'required|string|max:255',
            'plot_id' => 'nullable|exists:plots,id',
            'crop_id' => 'nullable|exists:crops,id',
            'rainfall_mm' => 'nullable|numeric|min:0|max:5000',
            'soil_type' => 'nullable|in:argileux,sableux,limoneux,argilo_limoneux,sableux_limoneux',
            'fertilizer_used' => 'nullable|boolean',
            'fertilizer_type' => 'nullable|string|max:255',
            'avg_temperature' => 'nullable|numeric|between:-10,60',
            'humidity_percent' => 'nullable|numeric|between:0,100',
        ];
    }

    public function messages(): array
    {
        return [
            'crop_name.required' => 'Le type de culture est obligatoire.',
            'area_hectares.required' => 'La superficie est obligatoire.',
            'region.required' => 'La région est obligatoire.',
        ];
    }
}
