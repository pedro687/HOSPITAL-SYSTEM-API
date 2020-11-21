**Rotas**

**Responsáveis**

Criar uma conta de responsável:

- POST `/responsibles`
- Body:

```json
{
	"name": "John Doe",
	"username": "john",
	"email": "johndoe@example.com",
	"password": "123456",
	"cpf": "74839375054",
	"phone": "0012345678"
}
```

Autenticar um responsável:

- POST `/responsibles/sessions`
- Body:

```json
{
	"username": "john",
	"password": "123123"
}
```

- Retorna informações do responsável e o token

Transformar a conta de um usuário em PRO:

- PATCH `/responsibles/pro`

- Atenção: Enviar Bearer token pelo header

Associar a conta de um Profissional à um Paciente:

- POST `/responsibles/caregivers`
- Body:
```json
{
	"patient_id": "ea1c26e6-a537-4838-9ca6-62da40880d02",
	"caregiver_id": "4bfc2c1f-3694-4494-bf25-4cad52e62f69"
}
```
- Atenção: Enviar Bearer token pelo header

Mostrar todos os profissionais associados ao responsável logado:

- GET `/caregivers`
- Atenção: Enviar Bearer token pelo header
- Retorna um array de profissionais

Mostrar um específico profissional associado ao responsável logado:

- GET `/caregivers/:ID_do_profissional`
- Atenção: Enviar Bearer token pelo header
- Retorna um profissional

**Profissionais**

Criar uma conta de profissional:

- POST `/caregivers`
- Body:
```json
{
	"name": "Lucas",
  "user_name": "thomazz",
  "password": "123456",
  "phone": "00 1234-5678"
}
```
- Atenção: Enviar Bearer token do responsável pelo header

Autenticar um profissional:

- POST `/caregivers/sessions`
- Body:
```json
{
	"username": "thomazz",
	"password": "123456"
}
```
- Retorna informações do profissional e o token

Deletar a conta de um profissional:

- DELETE `/caregivers/:ID_do_profissional`
- Atenção: Enviar Bearer token do responsável pelo header. Ele é quem será o responsável por esta ação

Mostrar todos os pacientes associados ao profissional logado:

- GET `/caregivers/patients`
- Atenção: Enviar Bearer token do profissional pelo header
- Retorna um array de pacientes

Mostrar um paciente específico:

- GET `/caregivers/patients/:ID_do_paciente`
- Atenção: Enviar Bearer token do profissional pelo header
- Retorna um objeto com as informações do paciente

**Pacientes**

Cadastra um paciente:

- POST `/patients`
- Body:
```json
{
	"name": "João",
	"age": "25",
	"patology": "Cancer"
}
```
- Atenção: Enviar Bearer token do responsável pelo header

Mostrar todos os pacientes de um responsáve:

- GET `/patients`
- Atenção: Enviar Bearer token do responsável pelo header
- Retorna um array de pacientes

Mostrar um único paciente:

- GET `/patients/:ID_do_paciente`
- Atenção: Enviar Bearer token do responsável pelo header
- Retorna um objeto com dados do paciente

Deleta um paciente associado ao responsável

- DELETE `patients/:ID_do_paciente`
- Atenção: Enviar Bearer token do responsável pelo header

**Agendamento Médico**

Cria um agendamento médico:

- POST `/doctor-appointments`
- Body:
```json
{
	"patient_id": "6a4fb348-2600-45d8-a394-fc5b2bad822e",
	"doctor_name": "Dr. Hans Chucrute",
	"doctor_phone": "00 0000-0000",
	"doctor_specialty": "Ginecologista",
	"date": "2020-06-16 02:56:00"
}
```
- Atenção: usar uma data futura
- Atenção: Enviar Bearer token do responsável pelo header

Mostrar todos os agendamentos médico de todos os pacientes do responsável:

- GET `/doctor-appointments`
- Atenção: Enviar Bearer token do responsável pelo header
- Retorna um array de agendamentos médico

Mostrar todos os agendamentos médico de um único paciente:

- GET `/doctor-appointments/patient/:ID_do_paciente`
- Atenção: Enviar Bearer token do responsável pelo header
- Retorna um array de agendamentos médico

Mostrar um único agendamento médico:

- GET `/doctor-appointments/:ID_do_agendamento`
- Atenção: Enviar Bearer token do responsável pelo header
- Retorna um objeto com as informações do agendamento

**Agendamento para consumo de medicação**

Criar um agendamento:

- POST `/medicines-appointment`
- Body:
```json
{
	"patient_id": "ec1bc127-9102-4b47-8917-1c3907b63518",
	"medicine_name": "Dipirona",
	"dose": "30 gotas",
	"frequency": 8,
	"next_dose": "2020-05-25 10:25:30"
}
```
- Atenção: Enviar Bearer token do responsável pelo header
- Atenção: O campo `next_dose` precisa possuir, na hora do cadastro, o horário da primeira dose.

Mostrar todos os agendamentos de um paciente:

- GET `/medicines-appointments/patients/:ID_do_paciente`
- Atenção: Enviar Bearer token do responsável ou do profissional pelo header
- Retorna um array de agendamentos

Mostrar um agendamento de um paciente:

- GET `/medicines-appointments/patients/:ID_do_paciente/:ID_do_agendamento`
- Atenção: Enviar Bearer token do responsável ou do profissional pelo header
- Retorna um objeto com as informações do agendamento

Atualizar as informações de um agendamento:

- PUT `/medicines-appointment/:ID_do_agendamento`
- Body:
```json
{
	"patient_id": "ec1bc127-9102-4b47-8917-1c3907b63518",
	"medicine_name": "NOVO MEDICAMENTO",
	"dose": "NOVA DESCRIÇÃO",
	"frequency": 6,
	"next_dose": "NOVO HORARIO"
}
```
- Atenção: Enviar Bearer token do responsável pelo header

Registrar a aplicação da dose para um paciente:

PATCH - `/medicines-appointment/patients/:ID_do_paciente/:ID_do_agendamento`
- Atenção: Enviar Bearer token do responsável ou do profissional pelo header
- O campo `next_dose` irá atualizar com o horário da próxima dose

Deletar um agendamento:

- DELETE `/medicines-appointment/:ID_do_agendamento`
- Atenção: Enviar Bearer token do responsável pelo header

**Relatórios**

Criar um relatório:

- POST `/reports`
- Body:
```json
{
    "patient_id": "684e307e-fb5e-418e-9f41-eb75f964ed4c",
    "description": "Paciente não quis tomar a medicação",
    "date": "2020-06-11 12:50:12"
}
```
- Atenção: Enviar Bearer token do profissional pelo header

Marcar o relatório como resolvido ou não resolvido:

- PATCH `/reports/solve/:ID_do_relatorio`
- Body:
```json
{
	"solved": true //ou false
}
```
- Atenção: Enviar Bearer token do profissional pelo header

Mostrar todos os relatórios criados pelo profissional autenticado:

- GET `/reports`
- Atenção: Enviar Bearer token do profissional pelo header
- Retorna um array de relatorios

Mostrar todos os relatórios de um paciente:

- GET `/reports/patients/:ID_do_paciente`
- Atenção: Enviar Bearer token do responsável ou do profissional pelo header
- Retorna um array de relatorios

Mostrar um único relatório:

- GET `/reports/:ID_do_relatorio`
- Atenção: Enviar Bearer token do responsável ou do profissional pelo header
