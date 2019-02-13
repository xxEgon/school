#include <iostream>
#include <string>
#include <fstream>
#include <cmath>
using namespace std;

int main(){
	
	string t[26] = {
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	"BCDEFGHIJKLMNOPQRSTUVWXYZA",
	"CDEFGHIJKLMNOPQRSTUVWXYZAB",
	"DEFGHIJKLMNOPQRSTUVWXYZABC",
	"EFGHIJKLMNOPQRSTUVWXYZABCD",
	"FGHIJKLMNOPQRSTUVWXYZABCDE",
	"GHIJKLMNOPQRSTUVWXYZABCDEF",
	"HIJKLMNOPQRSTUVWXYZABCDEFG",
	"IJKLMNOPQRSTUVWXYZABCDEFGH",
	"JKLMNOPQRSTUVWXYZABCDEFGHI",
	"KLMNOPQRSTUVWXYZABCDEFGHIJ",
	"LMNOPQRSTUVWXYZABCDEFGHIJK",
	"MNOPQRSTUVWXYZABCDEFGHIJKL",
	"NOPQRSTUVWXYZABCDEFGHIJKLM",
	"OPQRSTUVWXYZABCDEFGHIJKLMN",
	"PQRSTUVWXYZABCDEFGHIJKLMNO",
	"QRSTUVWXYZABCDEFGHIJKLMNOP",
	"RSTUVWXYZABCDEFGHIJKLMNOPQ",
	"STUVWXYZABCDEFGHIJKLMNOPQR",
	"TUVWXYZABCDEFGHIJKLMNOPQRS",
	"UVWXYZABCDEFGHIJKLMNOPQRST",
	"VWXYZABCDEFGHIJKLMNOPQRSTU",
	"WXYZABCDEFGHIJKLMNOPQRSTUV",
	"XYZABCDEFGHIJKLMNOPQRSTUVW",
	"YZABCDEFGHIJKLMNOPQRSTUVWX",
	"ZABCDEFGHIJKLMNOPQRSTUVWXY"
	};
	
	ifstream in;
	ofstream out;	
	
	string wyraz;
	string klucz;
	
	int i_znak  =  0;
	
	cout<<"Podaj klucz: ";
	cin>>klucz;
	
	//klucz to upper case
	for(int i = 0; i < klucz.length(); i++)
       klucz[i] = toupper(klucz[i]);	
       
    //SZYFROWANIE
	
	in.open("j.txt");
	if  (in.good())  {
		out.open("sz.txt");
		
		if  (out.good())  {
			cout<<"Zaszyfrowano: ";
			while  (!in.eof())  {
				getline(in, wyraz, ' ');
				
				for (int i  =  0; i  <  wyraz.length(); i++)  {
					int pos_klucz  =  t[0].find(klucz[i_znak  %  klucz.length()]);
					int pos_wyraz  =  t[0].find(wyraz[i]);
					wyraz[i] =  t[pos_klucz][pos_wyraz];
					i_znak++;
				}
				out<< wyraz<< " ";
				cout<<wyraz<< " ";
			}
				out.close();
				in.close();
				cout<<endl;
				
		} else
			cout<<"Blad utworzenia pliku";
	}
	else
		cout<<"Blad otwarcia pliku";
		
		
	wyraz="";
		
	//DESZYFROWANIE
	
	in.open("sz.txt");
	if  (in.good())  {
		out.open("odsz.txt");
		
		if  (out.good())  {
			cout<<"Odszyfrowano: ";
			while  (!in.eof())  {
				getline(in, wyraz, ' ');
				
//				for (int i  =  0; i  <  wyraz.length(); i++)  {
//					int pos_klucz  =  t[0].find(klucz[i_znak  %  klucz.length()]);
//					int pos_wyraz  =  t[0].find(wyraz[i]);
//					wyraz[i] =  t[pos_klucz][pos_wyraz];
//					i_znak++;
//				}
				
				for(int i = 0, j = 0; i < wyraz.length(); ++i)
			    {
			      char c = wyraz[i];
			 
			      if(c >= 'a' && c <= 'z')
			        c += 'A' - 'a';
			      else if(c < 'A' || c > 'Z')
			        continue;
			 
			      wyraz += (c - klucz[j] + 26) % 26 + 'A'; 
			      j = (j + 1) % klucz.length();
			    }
				
				out<< wyraz<< " ";
				cout<<wyraz<< " ";
			}
				out.close();
				in.close();
				cout<<endl;
				
		} else
			cout<<"Blad utworzenia pliku";
	}
	else
		cout<<"Blad otwarcia pliku";

	system("pause");
	return 0;
}



