package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities;

import java.io.BufferedReader; 
import java.io.BufferedWriter; 
import java.io.File; 
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader; 
import java.io.FileWriter; 
import java.io.IOException; 
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.LinkedList; 

public class ManipuladorArchivos { 



	/**Regresa un linkedList que contiene todos los renglones del archivo enviado*/ 
	public LinkedList<String> obtenRenglones(String nombreArchivo){ 
		File archivo = null; 
		FileReader fr = null; 
		BufferedReader br = null; 
		LinkedList<String> lista=new LinkedList<String>(); 
		//int i=0; 
		try { 
			archivo = new File (nombreArchivo); 
			fr = new FileReader (archivo); 
			//br = new BufferedReader(fr); 
			br=new BufferedReader( new InputStreamReader(new FileInputStream(archivo),"UTF8")); 
			 
			String linea; 
			while((linea=br.readLine())!=null){ 
				lista.add(linea); 

			} 
		} 
		catch(Exception e){ 
			e.printStackTrace(); 
			lista=null; 
		}finally{ 
			try{                     
				if( null != fr ){   
					fr.close();
					br.close();
				}                   
			}catch (Exception e2){ 
				e2.printStackTrace(); 
			} 
		} 

		return lista; 
	} 

	public BufferedWriter obtenWriter(String nombreArchivo){ 
		BufferedWriter out=null; 
		try{ 
			out = new BufferedWriter(new FileWriter(nombreArchivo, true)); 

		} catch (IOException e){ 
			e.printStackTrace(); 
		} 
		return out; 
	} 

	public void escribeEnArchivo(BufferedWriter writer,String contenido){ 
		try { 
			writer.write(contenido);
			writer.close();
		} catch (Exception k) { 
			// TODO Auto-generated catch block 
			k.printStackTrace(); 
		} 
	} 

	public void escribeEnArchivo(String nombreArchivo,String contenido){ 
		try { 
			BufferedWriter writer=obtenWriter(nombreArchivo);
			writer.write(contenido);
			writer.close();
		} catch (Exception k) { 
			// TODO Auto-generated catch block 
			k.printStackTrace(); 
		} 
	} 
	
	public boolean cierraWriter(BufferedWriter writer){ 
		try { 
			writer.close();
			return true;
		} catch (IOException e) { 
			// TODO Auto-generated catch block 
			e.printStackTrace();
			return false;
		} 
	} 
	
	/**borra el contenido de un archivo dejando el archivo en blanco*/
	public boolean limpiaArchivo(String archivo){
		File file=new File(archivo);
		try {
			PrintWriter writer = new PrintWriter(file);
			writer.print("");
			writer.close();
			return true;
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	
	/**Escribe en el archivo especificado el contenido de la lista donde cada item representa una linea*/
	public boolean  escribeEnArchivo(LinkedList<String> lineas,String archivo){
		Iterator<String> iterator=lineas.iterator();
		BufferedWriter writer=obtenWriter(archivo);
		while( iterator.hasNext() ){
			try {
				writer.write( iterator.next()+"\n" );
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return false;
			}
		}
		return cierraWriter(writer);
	}
	
} 