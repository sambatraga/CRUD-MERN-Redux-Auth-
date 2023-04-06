import jsPDF from 'jspdf'
import "jspdf-autotable"

export const printEmploye = (params:any)=>{

    let emp = params.row;

    let doc = new jsPDF();
    //
    doc.rect(10, 10, 130, 80);
    
    //Titre
    doc.setFontSize(16)
    doc.text("Carte d'identité",50, 20);
    
    //ajouter une image 
    doc.addImage(`http://localhost:2000/${emp.photos}`,"JPEG" ,100,25, 35, 35)

    doc.setFontSize(12);
    
    doc.text(`Nom : ${emp.nom}`, 15, 30)

    doc.text(`Prenom : ${emp.prenom}`, 15, 40)
    
    doc.text(`Email : ${emp.email}`, 15 , 50)

    doc.text(`Date de naissance : ${emp.date_naissance}`, 15 , 60)

    doc.text(`ID : ${emp._id}`, 15, 70)

    //doc.save("emp.pdf")

    doc.autoPrint();
    doc.output('dataurlnewwindow', {filename: "empl.pdf"});


}