QUEST_PUMPKINCHILD = {
	title = 'IDS_PROPQUEST_INC_001339',
	character = 'MaSa_JeongHwa',
	end_character = 'MaSa_MaYun',
	start_requirements = {
		min_level = 10,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = '',
	},
	rewards = {
		gold = 20000,
		exp = 0,
	},
	end_conditions = {
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001340',
			'IDS_PROPQUEST_INC_001341',
			'IDS_PROPQUEST_INC_001342',
			'IDS_PROPQUEST_INC_001343',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001344',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001345',
		},
		completed = {
			'IDS_PROPQUEST_INC_001346',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001347',
		},
	}
}
