export interface CreateAppointmentDto {
  start_date: Date;

  end_date: Date;

  paid_status: boolean;

  description: string;

  payment_mode: string;

  appointment_status: string;

  appointment_type: string;

  doctor_name: string;

  hospital_name: string;

  appointment_duration: number;

  patientId: string;
}
