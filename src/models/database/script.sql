--Prescriptions Table ----start------------------------------------------------------------
  create table prescriptions(
	id_prescription serial primary key not null,
  id_clinic integer null,
  id_physician integer not null,
  id_patient integer not null,
  prescription text not null
);
--Prescriptions Table ----end------------------------------------------------------------
