export interface CreateBillDto {
  amount: string;

  appointmentId: string;

  patientId: string;

  pet_type_Id: string;

  paid_status: string;

  date_paid: Date;
}
