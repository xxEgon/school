#include <iostream>
#include <fstream>
#include <algorithm>
using namespace std;


int main () {

	string tAnagramy[1000][2];
	
	ifstream in;
	in.open("dane_anagramy.txt");
	
	if  (in.good())  {				
		int i = 0;
		while  (!in.eof())  {
			for(int j = 0 ; j< 2; j++)
				in>> tAnagramy[i][j];
			i++;				
		}
		in.close();
	}
	else
		cout<<"Blad otwarcia pliku";

	int licz_anagramy = 0;
	bool symetryczna;
	char t1[7], t2[7];

	string tPowtarzajace[2000]; 
	int tPowtarzajaceWart [2000]= {0};
	
	int licz_powt= 0;
	bool nowy1, nowy2;
	
	string s1= "";
	string s2= "";
	
	for(int i = 0; i< 1000; i++) {
			for(int k= 0 ; k< 7; k++){
				t1[k]= tAnagramy[i][0][k];
				t2[k]= tAnagramy[i][1][k];
			}
			sort(t1, t1 + 7 );
			sort(t2, t2 + 7 );
			symetryczna = true;
			for(int k= 0 ; k< 7; k++)
				if(t1[k] != t2[k])
					symetryczna = false;	
			if(symetryczna) 
				licz_anagramy++;
			
			s1= "";
			s2= "";
			for(int k= 0 ; k< 7; k++){
				s1+= t1[k];
				s2+= t2[k];
			}
			
			nowy1 = true;
			nowy2 = true;
			for(int m= 0; m< licz_powt; m++ ){
				if(tPowtarzajace[m] == s1){
					nowy1 = false;
					tPowtarzajaceWart[m]++; 
				}
				if(tPowtarzajace[m] == s2){
					nowy2 = false;
					tPowtarzajaceWart[m]++; 
				}
			}
			if(nowy1 == true){
				licz_powt++;
				tPowtarzajace[licz_powt] = s1;
				tPowtarzajaceWart[licz_powt]++; 
			}
			if(nowy2 == true){
				licz_powt++;
				tPowtarzajace[licz_powt] = s2;
				tPowtarzajaceWart[licz_powt]++; 
			}
				
	}
	
//	for(int i = 0 ;i< 2000; i++) {
//		cout<<i<<'\t'<<tPowtarzajace[i]<<'\t'<< tPowtarzajaceWart[i]<<endl;
//	}
	
	int max= 0;
	for(int i =0;i< 2000; i++) 
		if(tPowtarzajaceWart[i]> max)
			max= tPowtarzajaceWart[i];	
	
	//cout<< licz_anagramy<<endl;
	//cout<< max<<endl;
	
	ofstream out;
	out.open("wyniki_anagramy.txt");		
	if  (out.good())  {
		out<<"a) "<< licz_anagramy<< '\n'<< "b) "<< max;
		out.close();			
	} else
		cout<< "Blad utworzenia pliku"<<endl;
	
//	for(int i = 0; i< 100; i++) {
//		for(int j = 0; j< 2; j++) {
//			cout<< tAnagramy[i][j]<< '\t';
//		}
//		cout<< '\n';
//	}
	
	system("pause");
	return 0;	
}
