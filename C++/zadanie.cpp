#include <sstream>
#include <string>
#include <iostream>
#include <fstream>
#include <math.h>
using namespace std;

bool isBigLetter (char znak);
string szyfruj (string klucz);
string deszyfruj ();
string zapisz_do_pliku (string s1, string s2);
void zad3 ();

int main () {
	
	string zad1;
	string zad2;	
		
	string klucz = "LUBIMYCZYTAC";		
	zad1 = szyfruj(klucz);
	zad2 = deszyfruj();	
	
	cout<<"--------------"<< endl;
	cout<< zapisz_do_pliku(zad1, zad2) <<endl;
	cout<<"--------------"<< endl<<endl;
	
	zad3();
	
	return 0;	
}

bool isBigLetter (char znak) {
	if('A' <= znak && znak <= 'Z')
		return true;
	return false;
}

string szyfruj (string klucz) {
	
	ifstream in;
	
	string wynik = ""; 
	wynik += "Zadanie 1";
	wynik += '\n';
	int powt_klucza = 1; //na pewno raz sie rozpocznie wiec startowo 1
	
	in.open("dokad.txt");
	if  (in.good())  {			
		
		int k = 0; //kolejne znaki klucza
		string tekst = "";	
		
		while  (!in.eof())  {				
			getline(in, tekst, ' ');
			
			for(int i= 0; i< tekst.length(); i++)
				if ( isBigLetter(tekst[i]) ) { //sprawdzenie czy znak jest duza litera, jesli nie to pomijamy
					tekst[i]+= (klucz[k] - 'A'); //zwiekszenie znaku o odpowiednia roznice znakow ASCII
					if(tekst[i] > 'Z') //jesli przekroczy zakres duzych liter
						tekst[i] -= 26;  //to odejmujac ilosc duzych liter przeniesiemy sie na odpowiednia pozycje liczona od poczatku alfabetu
					k++;						
					if (klucz.length() == k) { //jesli dlugosc klucza jest rowna aktualnej pozycji
						k = 0; //to zerujemy licznk - rozpoczynamy kolejne powtorzenie klucza 	
						powt_klucza++;					
					}				
				}
			wynik += tekst + " ";
		}		
		in.close();
	}
	else
		cout<<"Blad otwarcia pliku";	
	
	wynik += '\n';	
		
	cout<< wynik;
	cout<< endl << "Powtorzenia klucza: "<< powt_klucza<< endl << endl;
		
	return wynik;
}

string deszyfruj () {
	
	ifstream in;
	
	string wynik = ""; 
	wynik += "Zadanie 2";
	wynik += '\n';
	
	string wiersze[2]; //tablica wierszy pliku
	
	in.open("szyfr.txt");
	if  (in.good())  {		
		int wiersz = 0;
		while  (!in.eof())  {				
			getline(in, wiersze[wiersz], '\n');
			wiersz++;
		}
		in.close();	 
	}
	else
		cout<<"Blad otwarcia pliku";
		
	int k = 0; //kolejne znaki klucza
	string tekst = wiersze[0];	
	string klucz = wiersze[1];

	for(int i= 0; i< tekst.length(); i++){		
		if ( isBigLetter(tekst[i]) ) { //sprawdzenie czy znak jest duza litera, jesli nie to pomijamy
			tekst[i]-= (klucz[k] - 'A'); //zmniejszenie znaku o odpowiednia roznice znakow ASCII
			if(tekst[i] < 'A') //jesli przekroczy zakres duzych liter
				tekst[i] += 26;  //to dodajac ilosc duzych liter przeniesiemy sie na odpowiednia pozycje liczona od poczatku alfabetu
			k++;						
			if (klucz.length() == k) //jesli dlugosc klucza jest rowna aktualnej pozycji
				k = 0; //to zerujemy licznk - rozpoczynamy kolejne powtorzenie klucza 									
		}
		wynik += tekst[i];							
	}
	wynik +='\n';
	wynik +='\n';
	
	cout<< wynik;
	
	return wynik;
}

string zapisz_do_pliku (string s1, string s2) {
	
	ofstream out;
	out.open("odpowiedzi.txt");		
	if  (out.good())  {
		out << s1;
		out << endl;
		out << s2;
		out.close();			
	} else
		return "Blad utworzenia pliku";
	return "Poprawnie zapisano odpowiedzi do pliku 'odpowiedzi.txt'";
}

void zad3 () {
	
	const int rozmiarTablicy = 26;
	int liczniki[rozmiarTablicy];
	
	for (int i = 0; i < rozmiarTablicy; i++)
		liczniki[i] = 0;
		
	ifstream in;
	
	string wiersze[2]; //tablica wierszy pliku
	
	in.open("szyfr.txt");
	if  (in.good())  {		
		int wiersz = 0;
		while  (!in.eof())  {				
			getline(in, wiersze[wiersz], '\n');
			wiersz++;
		}
		in.close();	 
	}
	else
		cout<<"Blad otwarcia pliku";
		
	int k = 0; //kolejne znaki klucza
	string tekst = wiersze[0];	
	string klucz = wiersze[1];
	
	for(int i = 0; i < tekst.length(); i++) {
		if(isBigLetter(tekst[i])) {
			liczniki[tekst[i] - 'A']++; //pozycja litery w alfabecie na podstawie kodu ASCII i zwiekszenie licznika danej litery
		}
	}
	
	cout<< "Zadanie 3"<< endl;
	for(int i = 0 ; i < rozmiarTablicy; i++){
		cout << (i + 1 ) << ". " << '\t' << char( i + 'A' ) << " : " << liczniki[i] << endl;
	}
	cout << endl;
	
	int ilosc_znakow = 0;
	int suma_znakow = 0;
	
	for (int i = 0; i < rozmiarTablicy; i++) {
		ilosc_znakow += liczniki[i];
		suma_znakow += liczniki[i] * (liczniki[i] - 1);		
	} 
	double indeks = (suma_znakow * 1.0 )/(ilosc_znakow  * (ilosc_znakow - 1)); //podstawienie do wzoru
	double szacunkowa_dlg_klucza = 0.0285/(indeks - 0.0385); //podstawienie do wzoru
	double zaokraglenie = roundf(szacunkowa_dlg_klucza * 100) / 100;
	
	cout << "Oszacowana dlugosc klucza: "<< zaokraglenie <<endl;
	cout << "Dokladna dlugosc klucza: "<< klucz.length() <<endl;
	
}
