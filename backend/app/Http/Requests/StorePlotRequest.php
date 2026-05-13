<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePlotRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'area_hectares' => 'required|numeric|min:0.01|max:10000',
            'soil_type' => 'nullable|in:argileux,sableux,limoneux,argilo_limoneux,sableux_limoneux',
            'gps_coordinates' => 'nullable|string|max:255',
            'region' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ];
    }
}
