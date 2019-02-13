#include <iostream>
#include <fstream>
using namespace std;

bool czy_wzglednie_pierwsza(int , int );
int odwrotne_mod(int , int );
long long int sz_pot_mod(int , int , int );
string odszyfruj_z_pliku (int , int );
string szyfruj_do_pliku(string , int , int );
string odszyfruj_ze_zmiennej (string , int , int );


int main () {
	
	string tekst_caly;
	char tekst;
	int p, q; //11, 17 // 11, 13
	
	cout<< "Podaj tekst do zaszyfowania:"<<endl;
	getline(cin, tekst_caly, '\n');	
	cout<< "Podaj liczbe pierwsza nr 1:"<<endl;
	cin>> p;
	cout<< "Podaj liczbe pierwsza nr 2:"<<endl;
	cin>> q;
	
	//cout<<"============================================"<<endl;
	int n = p* q;
	//cout<< "n = "<< n<<endl;
	int fi = (p - 1)* (q - 1);
	//cout<< "fi = "<< fi<<endl;
	int e = 0;
	for(int i= 2; i< fi ; i++) {
		if(czy_wzglednie_pierwsza( i, fi )){
			e= i;	
			break;
		}	
	}
	cout<< "e = "<< e<<endl;
	
	//rozszerzony euklides albo algorytm pana - szukamy d
	int d= odwrotne_mod(e, fi);
	//cout<< "d = "<< d<<endl;	
	//cout<<"============================================"<<endl;
	
	string szyfr = szyfruj_do_pliku(tekst_caly, e, n);
	cout<<endl<< "Zaszyfrowany: "<<szyfr<<endl;
	cout<< "Klucz publiczny (n, e): (" <<n <<", "<<e<<")"<<endl;
	cout<< "Klucz prywatny (n, d): (" <<n <<", "<<d<<")"<<endl;
	
	string tekst_jawny = odszyfruj_z_pliku(d, n);
	cout<< "Odszyfrowany z pliku: "<< tekst_jawny<<endl;
	
	string tekst_jawny2 = odszyfruj_ze_zmiennej(szyfr, d, n);
	cout<< "Odszyfrowany ze zmiennej: "<< tekst_jawny2<<endl;
	
	system("pause");
	return 0;	
}

string szyfruj_do_pliku(string tekst_caly, int e, int n) {

	string wynik = "";
	for(int i= 0; i< tekst_caly.length(); i++) {
		cout<< "jawny = "<< (int) tekst_caly[i]<< " ==> "<<tekst_caly[i]<<endl;
		int szyfr = sz_pot_mod(tekst_caly[i], e, n);
		char sz = szyfr;
		cout<< "szyfr = "<< szyfr<< " ==> "<<sz<<endl;
		if(szyfr> 255)
			cout<< "BRAK KODU ASCII POWY¯EJ 255!"<<endl;
			
		wynik+= sz;
	}	
	
	ofstream out;
	out.open("szyfr.txt");		
	if  (out.good())  {
		out << wynik;
		out.close();			
	} else
		cout<< "Blad utworzenia pliku"<<endl;
		
	return wynik;
}

string odszyfruj_ze_zmiennej (string szyfr_caly, int d, int n) {
	
	string wynik = "";
	for(int i= 0; i< szyfr_caly.length(); i++) {
		int tj = sz_pot_mod(szyfr_caly[i], d, n);
		cout<< "odszyfrowany = "<< tj<<endl;
		if(tj> 255)
			cout<< "BRAK KODU ASCII POWY¯EJ 255!"<<endl;	
		char tj_char = tj;
		wynik+= tj_char;
	}
	
//	ofstream out;
//	out.open("jawny2.txt");		
//	if  (out.good())  {
//		out << wynik;
//		out.close();			
//	} else
//		cout<< "Blad utworzenia pliku"<<endl;
		
	return wynik;
}

string odszyfruj_z_pliku (int d, int n) {
	
	string szyfr_caly;
	
	ifstream in;
	in.open("szyfr.txt");
	if  (in.good())  {			
		
		int i =0;	
		
		while (!in.eof()) {
			getline(in, szyfr_caly, '\n');				
		}
		in.close();
	}
	else
		cout<<"Blad otwarcia pliku";
		
	string wynik = "";
	for(int i= 0; i< szyfr_caly.length(); i++) {
		int tj = sz_pot_mod(szyfr_caly[i], d, n);	
		char tj_char = tj;
		wynik+= tj_char;
	}
	
	ofstream out;
	out.open("jawny.txt");		
	if  (out.good())  {
		out << wynik;
		out.close();			
	} else
		cout<< "Blad utworzenia pliku"<<endl;
		
	return wynik;
}

bool czy_wzglednie_pierwsza(int a, int b)
{
	//nwd
  	int p; 
	while(b!=0)
	{
		p = b;
		b = a%b;
		a = p;  
	}
	//wzglednie pierwsza jesli 1	
	if(a == 1)
		return true; 
	return false;
}

int odwrotne_mod(int a, int n)
{
  int a0,n0,p0,p1,q,r,t;

  p0 = 0; p1 = 1; a0 = a; n0 = n;
  q  = n0 / a0;
  r  = n0 % a0;
  while(r > 0)
  {
    t = p0 - q * p1;
    if(t >= 0)
      t = t % n;
    else
      t = n - ((-t) % n);
    p0 = p1; p1 = t;
    n0 = a0; a0 = r;
    q  = n0 / a0;
    r  = n0 % a0;
  }
  return p1;
}

long long int sz_pot_mod(int pod, int wyk, int mod)
{
	long long int wyn = 1;
	int i;
	long int r = pod%mod;
	 
	for (i=1; i<=wyk; i<<=1)
	{
		r %= mod;
		if (( wyk& i ) != 0)
		{
			wyn *= r;
			wyn %= mod;
		}
		r *= r;
	}
	return wyn;
}

