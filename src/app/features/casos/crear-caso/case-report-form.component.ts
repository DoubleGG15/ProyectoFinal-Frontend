import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


export interface ConflictCase {
  conflictType: string;
  description: string;
  address: string;
  respondentName: string;
  evidenceFile?: File | null;
  status: 'nuevo' | 'asignado' | 'en mediación' | 'resuelto' | 'cerrado sin acuerdo';
  createdAt: Date;
}


interface CaseReportForm {
  conflictType: FormControl<string>;
  description: FormControl<string>;
  address: FormControl<string>;
  respondentName: FormControl<string>;
  evidenceFile: FormControl<File | null>;
}

@Component({
  selector: 'app-case-report-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './case-report-form.component.html',
  styleUrls: ['./case-report-form.component.css'],
})
export class CaseReportFormComponent implements OnInit {
  reportForm!: FormGroup<CaseReportForm>;
  conflictTypes: string[] = ['Ruido', 'Límites', 'Áreas comunes', 'Mascotas', 'Otros'];
  selectedFileName: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.reportForm = this.fb.group<CaseReportForm>({
      conflictType: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(20)],
      }),
      address: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(10)],
      }),
      respondentName: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      evidenceFile: new FormControl<File | null>(null, { validators: [this.fileValidator] }),
    });
  }


  private fileValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value as File | null;
    if (!file) {
      return null; // El archivo es opcional, por lo tanto si no se selecciona es válido.
    }


    const allowedTypes = ['image/jpeg', 'image/png', 'image/heic','application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return { invalidFileType: true };
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return { fileTooLarge: true };
    }

    return null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      this.reportForm.controls.evidenceFile.setValue(file);
      this.reportForm.controls.evidenceFile.markAsDirty();
    } else {
      this.selectedFileName = '';
      this.reportForm.controls.evidenceFile.setValue(null);
    }
  }

  onSubmit(): void {
    if (this.reportForm.invalid) {
      this.reportForm.markAllAsTouched();
      return;
    }

    const formValue = this.reportForm.getRawValue();

    const newCase: ConflictCase = {
      conflictType: formValue.conflictType,
      description: formValue.description,
      address: formValue.address,
      respondentName: formValue.respondentName,
      evidenceFile: formValue.evidenceFile,
      status: 'nuevo',
      createdAt: new Date(),
    };

    console.log('--- FORMULARIO VÁLIDO ENVIADO ---');
    console.log('Objeto estructurado ConflictCase:', newCase);

    alert(
      '¡Reporte generado con éxito! Revisa la consola del desarrollador para validar el payload.',
    );
    this.resetForm();
  }

  resetForm(): void {
    this.reportForm.reset({
      conflictType: '',
      description: '',
      address: '',
      respondentName: '',
      evidenceFile: null,
    });
    this.selectedFileName = '';
  }
}
