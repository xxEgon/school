#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
using namespace std;

string skrot (string );
string skrot_z_opisem (string );
string A (int , int , int []);
string IntToString (int );


int main () {
	
	ifstream in;
		
	string tWiad[11];
	
	in.open("wiadomosci.txt");
	
	if  (in.good())  {			
		
		int i =0;
		
		while  (!in.eof() && i < 11)  {
			getline(in, tWiad[i], '\n');	
			i++;				
		}
		in.close();
	}
	else
		cout<<"Blad otwarcia pliku";	
	
	string wynik1 = skrot_z_opisem(tWiad[0]);
	
	//cout<< wynik1;	
	
	int tPodpisy[11][8];
	
	in.open("podpisy.txt");
	
	if  (in.good())  {			
		
		int i = 0;
		
		while  (!in.eof() && i < 11)  {
			for(int j = 0 ; j< 8; j++)
				in>> tPodpisy[i][j];
			i++;				
		}
		in.close();
	}
	else
		cout<<"Blad otwarcia pliku";
	
	string wynik2 = "";
	for(int i =0 ;i< 11; i++){
//		ostringstream s;
//    	s<<i+1;
//		wynik2+= s.str();
//		wynik2+= "\t";
		wynik2+= A(3, 200, tPodpisy[i]);
		wynik2+= '\n';
		//cout<< A(3, 200, tPodpisy[i])<< endl;
	}
	//cout<< wynik2;
	
	string wynik3 = "";
	string skrot1 = "", skrot2 = "";
	bool poprawny;
	for(int i=0 ; i< 11; i++) {
		skrot1 = skrot(tWiad[i]);
		skrot2 = A(3, 200, tPodpisy[i]);
		//cout<< skrot1<< " " << skrot2 << endl;
		poprawny = true;	
		for(int j=0 ; j< 8 ; j++)
			if(skrot1[j] != skrot2[j])
				poprawny = false;
		if(poprawny) {
			wynik3+= IntToString(i+1);
			wynik3+= " ";
		}
	}
	//cout<< wynik3<< endl;
	
	ofstream out;
	out.open("epodpis_wynik.txt");		
	if  (out.good())  {
		out<<wynik1<<endl<<wynik2<<endl<<wynik3<<endl;
		out.close();			
	} else
		cout<< "Blad utworzenia pliku"<<endl;
			
	
	system("pause");
	return 0;	
}

string skrot (string w) {
	
	string pom= "ALGORYTM";
	char S[8];
	for (int i=0 ; i < 8; i++) 
		S[i]= pom[i];
	
	int ile_kropek= w.length() % 8;
	
	for(int i=0; i < 8-ile_kropek; i++)
		w+= ".";
	
	for(int i=0; i < w.length(); i+= 8 ) {
		string porcja = w.substr(i, 8);
		for(int j= 0 ; j < 8; j++)
			S[j] = (S[j] + porcja[j]) % 128; 
	}
	
	string wynik = "";
	for(int i=0 ; i < 8; i++)
		wynik+= char(65 + S[i] % 26); 
	
	return wynik;
}

string skrot_z_opisem (string w) {
	
	string wynik = "";
	
	string pom= "ALGORYTM";
	char S[8];
	for (int i=0 ; i < 8; i++) 
		S[i]= pom[i];
	
	int ile_kropek= w.length() % 8;
	
	for(int i=0; i < 8-ile_kropek; i++)
		w+= ".";
	
	wynik+= IntToString(w.length());
	wynik+= '\n';
	
	for(int i=0; i < w.length(); i+= 8 ) {
		string porcja = w.substr(i, 8);
		for(int j= 0 ; j < 8; j++)
			S[j] = (S[j] + porcja[j]) % 128; 
	}
	
	for(int i=0 ; i < 8; i++){
		wynik+= IntToString(int(S[i])); 
		wynik+= " ";
	}		
	wynik+= '\n';
	
	for(int i=0 ; i < 8; i++)
		wynik+= char(65 + S[i] % 26); 		
	wynik+= '\n';
	
	return wynik;
}

string A (int d, int n, int tLiczby[]) {
	
	string wynik = "";
	for(int i= 0; i < 8; i++){
		int x= tLiczby[i] * d % n;
		wynik+= x;
	}
	return wynik;
}

string IntToString (int str)
{
    ostringstream s;
    s<<str;
    return s.str();
}

