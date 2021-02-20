/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.encryption_credential.business.rest;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
public class CredentialValidationWrapper {

    private String clave;
    private String usuario;
    private String folio;
    private String signature;
    private String usuarioM2k;
    private String regionM2k;

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave.trim();
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getFolio() {
        return folio;
    }

    public void setFolio(String folio) {
        this.folio = folio.trim();
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature.trim();
    }

    public String getUsuarioM2k() {
        return usuarioM2k;
    }

    public void setUsuarioM2k(String usuarioM2k) {
        this.usuarioM2k = usuarioM2k.trim();
    }

    public String getRegionM2k() {
        return regionM2k;
    }

    public void setRegionM2k(String regionM2k) {
        this.regionM2k = regionM2k;
    }

    public String getToValidate() {
        return clave.concat("|").concat(usuario).concat("|").concat(folio);
    }

//    public String getToValidate() {
//        return clave.concat("|").concat(usuario).concat("|").concat(folio);
//    }
}
