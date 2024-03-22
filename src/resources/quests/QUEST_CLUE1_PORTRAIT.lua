QUEST_CLUE1_PORTRAIT = {
	title = 'IDS_PROPQUEST_INC_000907',
	character = 'MaSa_Helgar',
	end_character = 'MaFl_Tucani',
	start_requirements = {
		min_level = 26,
		max_level = 30,
		job = { 'JOB_MERCENARY', 'JOB_ACROBAT', 'JOB_ASSIST', 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_FIND_PORTRAIT',
	},
	rewards = {
		gold = 0,
		exp = 2070,
		items = {
			{ id = 'II_SYS_SYS_QUE_CLUEPORT1', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000908',
			'IDS_PROPQUEST_INC_000909',
			'IDS_PROPQUEST_INC_000910',
			'IDS_PROPQUEST_INC_000911',
			'IDS_PROPQUEST_INC_000912',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000913',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000914',
		},
		completed = {
			'IDS_PROPQUEST_INC_000915',
			'IDS_PROPQUEST_INC_000916',
			'IDS_PROPQUEST_INC_000917',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000918',
		},
	}
}
