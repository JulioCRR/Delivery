package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.mail.ReporteTemplet;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.rest.EstatusFront;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.informix.M2kInfoRegistro;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.search_petition.business.batch.PetitionStatus;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author bermudezja
 *
 */
@Service
public class FormatoExel {

    @Autowired
    private FormaterDate formater;

   
    @Autowired
    private PetitionStatus status;

    
    @Autowired
    private ReporteTemplet reporte;

    private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(FormatoExel.class);

    public void crateformatoExel(List<M2kInfoRegistro> registros, EstatusFront front) throws IOException {

        int fila = 1;
        String[] headersRow = new String[]{"REGION", "USUARIO", "SERVICIO", "IP", "FECHA_INICIO",
                                             "IDPETICION", "TIEMPO_EJECUCION", "TIEMPO_CONECTOR",
                                                 "TIPO_CONECTOR", "XML_RECIBIDO", "XML_REGRESADO",
                                              "TIPO DE RESPUESTA", "ACCION", "INSTANCIA", "HOST"};

        if (registros != null && !registros.isEmpty()) {
            HSSFWorkbook libro = new HSSFWorkbook();
            Sheet hoja = libro.createSheet("BITACORA_" + front.getTelefonoFront());
            Row row = hoja.createRow((short) 0);
            CellStyle styleHeaders = libro.createCellStyle();
            styleHeaders.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            styleHeaders.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            styleHeaders.setAlignment(HorizontalAlignment.LEFT);
            String[] headers = removeHeaders(headersRow, registros);
            for (int i = 0; i < headers.length; i++) {
                hoja.setColumnWidth(i, 5000);
                Cell cell = row.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(styleHeaders);
            }

            CellStyle rellenarXml = libro.createCellStyle();
            rellenarXml.setAlignment(HorizontalAlignment.FILL);

            CellStyle alinearLe = libro.createCellStyle();
            alinearLe.setAlignment(HorizontalAlignment.LEFT);

            for (M2kInfoRegistro bitacora : registros) {
                Row rowInfo = hoja.createRow((short) fila);
                rowInfo.createCell(0).setCellValue(bitacora.getRegion());
                rowInfo.createCell(1).setCellValue(bitacora.getUsuario());
                rowInfo.createCell(2).setCellValue(bitacora.getFuncion());
                rowInfo.createCell(3).setCellValue(bitacora.getIp());
                rowInfo.createCell(4).setCellValue(formater.parselocalDate(bitacora.getFechaInicio()));
                rowInfo.createCell(5).setCellValue(bitacora.getIdPeticion());
                Cell cellWeb = rowInfo.createCell(6);
                cellWeb.setCellValue(bitacora.getTiempoTotalWeb());
                cellWeb.setCellStyle(alinearLe);
                rowInfo.createCell(7).setCellValue(bitacora.getTiempoTotalConector());
                rowInfo.createCell(8).setCellValue(bitacora.getTipoConector());
                rowInfo.createCell(9).setCellValue(bitacora.getXmlEntrada());
                Cell cellXml = rowInfo.createCell(10);
                cellXml.setCellValue(bitacora.getXmlRespuesta());
                cellXml.setCellStyle(rellenarXml);
                if (bitacora.getAccion() != null) {
                    rowInfo.createCell(11).setCellValue(bitacora.getTipoRespuesta());
                    rowInfo.createCell(12).setCellValue(bitacora.getAccion());
                    rowInfo.createCell(13).setCellValue(bitacora.getInstancia());
                    rowInfo.createCell(14).setCellValue(bitacora.getServerHost());
                }
                fila++;
            }
            try {
                ByteArrayOutputStream fileInfoM2k = new ByteArrayOutputStream();
                libro.write(fileInfoM2k);
                byte[] xlsInfoM2k = fileInfoM2k.toByteArray();
                fileInfoM2k.close();
                LOG.info("SE CREA DOCUMENTO EXEL");
                reporte.enviarHtml(front, 1, Constants.MESSAGE_OK, xlsInfoM2k);
            } catch (IOException ex) {
                ex.printStackTrace();
                reporte.enviarHtmlExeption(front, ex.toString());
                status.changeStatus(front, 5);
            }
        } else {
            reporte.enviarHtml(front, 1, Constants.MESSAGE_EMPATY, null);
        }
    }

    public String[] removeHeaders(String[] headers, List<M2kInfoRegistro> registro) {

        ArrayList<String> header = new ArrayList<String>(Arrays.asList(headers));
        for (M2kInfoRegistro info : registro) {
            if (info.getAccion() == null) {
                header.remove("TIPO DE RESPUESTA");
                header.remove("ACCION");
                header.remove("INSTANCIA");
                header.remove("HOST");
            }
            headers = header.toArray(new String[header.size()]);
            break;
        }
        return headers;
    }
}
