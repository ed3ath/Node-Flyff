QUEST_2128 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_001417',
	character = 'MaDa_Lurif',
	end_character = 'MaDa_Lurif',
	start_requirements = {
		min_level = 60,
		max_level = 129,
		job = { 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 2709462,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_LIGHTSOFTFUR', quantity = 40, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001418',
			'IDS_PROPQUEST_REQUESTBOX_INC_001419',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001420',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001421',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001422',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_001423',
		},
	}
}
