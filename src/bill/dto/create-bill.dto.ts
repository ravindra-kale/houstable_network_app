export interface CreateBillDto {
  amount: string;

  appointment_id: string;

  patient_id: string;

  pet_id: string;

  paid_status: string;

  date_paid: Date;
}
