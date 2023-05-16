

var tablaPaciente = localStorage.getItem("tablaPacienteStorage");
tablaPaciente = JSON.parse(tablaPaciente);
if (tablaPaciente == null) {
    var tablaPaciente = [];
}


var idForm = localStorage.getItem("idForm");
idForm = JSON.parse(idForm);
if (idForm == null) {
    var idForm = 0;
}

cargarPagina();

function guardar() {


    Swal.fire({
        title: 'GUARDAR',
        html: 'DESEA GUARDAR LOS CAMBIOS?',
        showDenyButton: true,
        confirmButtonText: 'SI',
        denyButtonText: 'NO'
    }).then(
        (result) => {
            if (result.isConfirmed) {

                console.log("PRESIONO GUARDAR...");
                var objPaciente = JSON.stringify({
                    idPaciente: (idForm > 0) ? idForm : (tablaPaciente.length + 1),
                    nombApellido: document.getElementById("txtNombApellido").value,
                    telefono: document.getElementById("txtTelefono").value,
                    correo: document.getElementById("txtCorreo").value,
                    fechaN: document.getElementById("txtFechaN").value,
                    motivo: document.getElementById("txtMotivo").value
                });
                console.log(objPaciente);
                //EDITAR
                if (idForm > 0) {
                    for (const i in tablaPaciente) {
                        var varPaciente = JSON.parse(tablaPaciente[i]);
                        if (varPaciente.idPaciente == idForm) {
                            tablaPaciente[i] = objPaciente;
                            break;
                        }

                    }

                } else {
                    // NUEVOS PACIENTES
                    tablaPaciente.push(objPaciente);
                }

                localStorage.setItem("tablaPacienteStorage", JSON.stringify(tablaPaciente));

                Swal.fire('CAMBIOS  GUARDADOS','','success').then(
                    (result)=>{
                        window.location.replace("homeClientes.html");
                    }
                );
            }else if (result.isDenied){
                Swal.fire('CAMBIOS NO GUARDADOS','','info');
            }
        }
    );

}

function cargarPagina() {
    if (idForm > 0) {
        // SACAR DATOS DE LA FILA DE LA TABLA Y PONERLO EN EL FORMULARIO
        for (const i in tablaPaciente) {
            var varPaciente = JSON.parse(tablaPaciente[i]);
            if (varPaciente.idPaciente == idForm) {
                document.getElementById("txtIdPaciente").value = varPaciente.idPaciente;
                document.getElementById("txtNombApellido").value = varPaciente.nombApellido;
                
                document.getElementById("txtTelefono").value = varPaciente.telefono;
                document.getElementById("txtCorreo").value = varPaciente.correo;
                document.getElementById("txtFechaN").value = varPaciente.fechaN;
                document.getElementById("txtMotivo").value = varPaciente.motivo;
                
                break;
            }
        }
    }
}
