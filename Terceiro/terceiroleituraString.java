package Terceiro;
import java.util.List;
import java.util.ArrayList;
import java.util.Scanner;

class dados{
    private char caractere;
    private int quantidade;

    dados(char letra){
        caractere = letra;
        quantidade = 1;
    }
    
    void acrescenta(){
        quantidade++;
    }

    int retornaQuantidade(){
        return quantidade;
    }

    Character retornaChar(){
        return caractere;
    }

    boolean comparaLetra(char letra){
        if(letra==caractere)
            return true;
        else
            return false;
    }
}

public class terceiroleituraString{
    public static void main(String[] args) {
        Scanner ler = new Scanner(System.in);
        List<dados> tabelaChar = new ArrayList<dados>();
        String palavra = ler.nextLine();
        boolean etapa = false;

        for(int i=0;i<palavra.length();i++){
            char letra = palavra.charAt(i);
            if((letra>=65 && letra<=90) || (letra>=97 && letra<=122)){
                for(int j=0;j<tabelaChar.size();j++){
                    dados x = tabelaChar.get(j);
                    if(x.comparaLetra(letra)){
                        x.acrescenta();
                        j = tabelaChar.size();
                        etapa = true;
                    }
                }
                if(!etapa)
                    tabelaChar.add(new dados(letra));
                }
            etapa = false;
        }

        System.out.println("Original String: "+palavra);
        for(int i=0;i<tabelaChar.size();i++){
            dados y = tabelaChar.get(i);
            System.out.println(y.retornaChar() + " : " + y.retornaQuantidade());
        }
        ler.close();
    }
}
