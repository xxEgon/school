#include <sstream>
#include <string>
#include <iostream>
#include <fstream>
#include <math.h>
using namespace std;

void zad1 ();
void zad2 ();
void zad3 ();

int main () {
		
	zad1();
	cout<<endl;
	zad2();
	cout<<endl;
	zad3();
	cout<<endl;
	
	system("pause");
	return 0;	
}

void zad1 () {
	
	ifstream in;
	
	string tTekst[6];
	string klucz[50];
	
	in.open("szyfr1.txt");
	if  (in.good())  {			
		
		int i =0;	
		
		while  (!in.eof() && i < 7)  {
			if(i==6)
				for(int j =0;j<50;j++)
					getline(in, klucz[j], ' '); 
			else
				getline(in, tTekst[i], '\n');	
			i++;				
		}
		in.close();
	}
	else
		cout<<"Blad otwarcia pliku";	
		
	int klucz2[50];
		//cout<<"PRZED"<<endl;
		//cout<<"klucz:"<<endl;
		for(int i= 0; i< 50; i++) {
			stringstream a(klucz[i]);
			a>> klucz2[i];
			//cout<<klucz2[i]<<"-";
		}
		//cout<<endl;
		
		//for(int i= 0; i< (sizeof(tTekst)/sizeof(*tTekst)); i++) 
			//cout<<"-> "<< tTekst[i]<<endl;
				
		//cout<<"============="<<endl;
		
		for(int i= 0; i< 6; i++) 
			for (int j =0; j< 50; j++)
				swap(tTekst[i][j], tTekst[i][klucz2[j]-1]); 			
			
		//cout<<"PO"<<endl;
		
		string wynik = "";
		
		for(int i= 0; i< 6; i++) {
			cout<< tTekst[i]<<endl;
			wynik+= tTekst[i];
			wynik+= '\n';
		}
			ofstream out;
			out.open("wyniki_szyfr1.txt");		
			if  (out.good())  {
				out << wynik;
				out.close();			
			} else
				cout<< "Blad utworzenia pliku"<<endl;
}

void zad2 () {
	
	ifstream in;
	
	string tekst;
	string klucz[15];
	
	in.open("szyfr2.txt");
	if  (in.good())  {			
		
		int i =0;	
		
		while  (!in.eof() && i < 2)  {
			if(i==1)
				for(int j =0;j<15;j++)
					getline(in, klucz[j], ' '); 
			else
				getline(in, tekst, '\n');	
			i++;				
		}
		in.close();
	}
	else
		cout<<"Blad otwarcia pliku";	
		
	int klucz2[15];
		//cout<<"PRZED"<<endl;
		//cout<<"klucz:"<<endl;
		for(int i= 0; i< 15; i++) {
			stringstream a(klucz[i]);
			a>> klucz2[i];
			//cout<<klucz2[i]<<"-";
		}
		//cout<<endl;
		
		//cout<<"-> "<< tekst<<endl;
				
		//cout<<"============="<<endl;
		
		for (int j =0, i=0 ; j< 50; j++, i++) {
			swap(tekst[j], tekst[klucz2[i] - 1]); 
			if(i==14)
				i= -1;
		}
						
			
		//cout<<"PO"<<endl;
		
		string wynik = "";
		
		cout<< tekst<<endl;
		wynik+= tekst;
		wynik+= '\n';
		
		ofstream out;
		out.open("wyniki_szyfr2.txt");		
		if  (out.good())  {
			out << wynik;
			out.close();			
		} else
			cout<< "Blad utworzenia pliku"<<endl;
}

void zad3 () {
ifstream in;
	
	string tekst;
	int klucz[6] = {6, 2, 4, 1, 5, 3};
	
	in.open("szyfr3.txt");
	if  (in.good())  {			
		
		while  (!in.eof())  {
			getline(in, tekst, '\n');				
		}
		in.close();
	}
	else
		cout<<"Blad otwarcia pliku";	
		
		//cout<<"PRZED"<<endl;
		//cout<<"klucz:"<<endl;
		//for(int i= 0; i< 6; i++) {
			//cout<<klucz[i]<<"-";
		//}
		//cout<<endl;
		
		//cout<<"-> "<< tekst<<endl;
				
		//cout<<"============="<<endl;
		
		int start = 49%6;
		for (int j = 49, i = start ; j>= 0; j--, i--) {
			swap(tekst[j], tekst[klucz[i] - 1]); 
			if(i==0)
				i= 6;
		}		
			
		//cout<<"PO"<<endl;
		
		string wynik = "";
		
		cout<< tekst<<endl;
		wynik+= tekst;
		wynik+= '\n';
		
		ofstream out;
		out.open("wyniki_szyfr3.txt");		
		if  (out.good())  {
			out << wynik;
			out.close();			
		} else
			cout<< "Blad utworzenia pliku"<<endl;
}



