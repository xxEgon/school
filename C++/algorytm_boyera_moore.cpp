#include <iostream>
using namespace std;

int main () {
	
	//string wzor = "EST", tekst="TO JEST ZWYK£Y TEKST TEST";
	string wzor, tekst;
	
	cout<< "Podaj wzor: "<<endl;
	getline(cin, wzor,  '\n'); 
	cout<< "Podaj tekst: "<<endl;
	getline(cin, tekst,  '\n'); 
	
	int M = wzor.length();
	int N = tekst.length();
	
	int shift[128];
	for(int i =0; i<128; i++)
		shift[i] = M;
			
	for(int i= M-1; i>= 0; i--)
		if(shift[wzor[i]]< M) 
			continue;
		else 
			shift[wzor[i]] = M-1-i;
		
	bool znaleziono = false;
	bool nie_znaleziono = false;
	int i = M-1, j = M-1;
	while(i < N) {	
		while(j > 0 && !nie_znaleziono) {
			while(tekst[i] != wzor[j]) {
				int x = shift[tekst[i]];
				if(M - j > x)
					i+= M- j;
				else
					i+= x;
				if(i> N) {
					nie_znaleziono = true;
					break;
				}				
				j= M - 1;
			}
			if(!nie_znaleziono) {
				i--;
				j--;	
			}	
		}	
		if(!nie_znaleziono) {
			cout<< "WZORZEC ZNALEZIONO NA POZYCJI: "<< i <<endl; //pozycja liczona w tekscie od zera 
			znaleziono = true;
			i+=M + 1; //przesuniecie o dlugosc wzorca i jeszcze jedna pozycje
			j= M - 1;
		}		
	}
	
	if(nie_znaleziono && !znaleziono) 
		cout<< "WZORCA NIE ZNALEZIONO" <<endl;
	
	system("pause");
	return 0;	
}


